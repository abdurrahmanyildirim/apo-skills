// PreToolUse hook for the ask skill: allows only read-only Bash commands.
// Allowlist, not denylist: anything not recognised is rejected (exit 2).
import { readFileSync } from 'node:fs';

const READ_COMMANDS = new Set([
  'cat',
  'head',
  'tail',
  'ls',
  'tree',
  'wc',
  'grep',
  'rg',
  'sort',
  'uniq',
  'cut',
  'tr',
  'diff',
  'stat',
  'file',
  'pwd',
  'echo',
  'jq',
  'basename',
  'dirname',
  'realpath',
  'which',
  'date',
  'du',
  'df',
  'column',
  'nl',
  'true',
]);
const GIT_READ = new Set([
  'log',
  'show',
  'diff',
  'blame',
  'status',
  'branch',
  'tag',
  'rev-parse',
  'rev-list',
  'ls-files',
  'ls-tree',
  'ls-remote',
  'cat-file',
  'shortlog',
  'describe',
  'grep',
  'merge-base',
  'reflog',
  'remote',
  'config',
  'name-rev',
  'whatchanged',
  'blame',
]);
const GH_READ_ACTION = new Set([
  'view',
  'list',
  'status',
  'diff',
  'checks',
  'search',
]);

const deny = (reason) => {
  process.stderr.write(`ask mode: ${reason}. Read-only commands only.\n`);
  process.exit(2);
};

const words = (segment) => segment.trim().split(/\s+/).filter(Boolean);

function checkSegment(segment) {
  const [cmd, ...args] = words(segment);
  if (!cmd) return;
  const has = (re) => args.some((a) => re.test(a));

  if (cmd === 'sort' || cmd === 'tree') {
    if (has(/^(-o|--output)/) || (cmd === 'sort' && has(/^-\w*o/)))
      deny(`${cmd} -o writes a file`);
  }
  if (cmd === 'uniq' && args.filter((a) => !a.startsWith('-')).length > 1)
    deny('uniq with an output file');
  if (READ_COMMANDS.has(cmd)) return;
  switch (cmd) {
    case 'git': {
      const sub = args.find((a) => !a.startsWith('-'));
      if (!GIT_READ.has(sub)) deny(`git ${sub ?? ''} is not read-only`);
      if (
        sub === 'branch' &&
        has(/^(-d|-D|-m|-M|-c|-C|--delete|--move|--copy|--set-upstream-to|-u)$/)
      )
        deny('git branch write');
      if (sub === 'tag' && has(/^(-d|-a|-s|-f|--delete)$/))
        deny('git tag write');
      if (
        sub === 'remote' &&
        args.some((a) =>
          [
            'add',
            'remove',
            'rm',
            'rename',
            'set-url',
            'prune',
            'update',
          ].includes(a),
        )
      )
        deny('git remote write');
      if (
        sub === 'config' &&
        !has(/^(--get|--get-all|--list|-l|--get-regexp)$/)
      )
        deny('git config write');
      if (has(/^--output(=|$)/)) deny('git --output writes a file');
      return;
    }
    case 'gh': {
      const [group, action] = args;
      if (group === 'api') {
        if (has(/^(-X|--method|-f|-F|--field|--raw-field|--input)(=|$)/i))
          deny('gh api with a non-GET method or body');
        return;
      }
      if (group === 'auth' && action === 'status') return;
      if (!GH_READ_ACTION.has(action))
        deny(`gh ${group ?? ''} ${action ?? ''} is not read-only`);
      return;
    }
    case 'find':
      if (has(/^(-delete|-exec|-execdir|-ok|-okdir|-fprint\w*|-fls)$/))
        deny('find with a write/exec action');
      return;
    case 'sed':
      if (has(/^(-i|--in-place)/) || has(/^-\w*i/)) deny('sed -i edits files');
      return;
    case 'awk':
      if (has(/system\(|>|\|/)) deny('awk with output redirection or system()');
      return;
    case 'pnpm':
      if (args[0] === 'utils:find' || args[0] === 'utils:find:all') return;
      if (args[0] === 'nx' && args[1] === 'show') return;
      deny(`pnpm ${args[0] ?? ''} is not allowed`);
      return;
    case 'nx':
      if (args[0] === 'show') return;
      deny('only `nx show` is allowed');
      return;
    default:
      deny(`${cmd} is not on the read-only allowlist`);
  }
}

const input = JSON.parse(readFileSync(0, 'utf8'));
const command = input?.tool_input?.command ?? '';

// Redirects, substitution and backgrounding can write or smuggle commands.
const stripped = command.replace(
  /2>&1|&>\s*\/dev\/null|[0-9]?>\s*\/dev\/null/g,
  '',
);
if (
  /[<>]|`|\$\(|\$\{|\n/.test(stripped) ||
  /(^|[^&])&($|[^&])/.test(stripped)
) {
  deny('redirects, substitution, newlines or backgrounding');
}

for (const segment of stripped.split(/\|\||&&|;|\|/)) checkSegment(segment);

// scripts/trace-resolution.cjs
// Usage: node scripts/trace-resolution.cjs <file-to-trace> [tsconfigPath]
// Prints module resolution traces using the TypeScript API and the provided tsconfig.
const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const fileToTrace = process.argv[2];
const tsconfigPath = process.argv[3] || 'tsconfig.declarations.json';

if (!fileToTrace) {
  console.error('Usage: node scripts/trace-resolution.cjs <file-to-trace> [tsconfigPath]');
  process.exit(2);
}

const absTsconfig = path.resolve(tsconfigPath);
if (!fs.existsSync(absTsconfig)) {
  console.error('tsconfig not found at', absTsconfig);
  process.exit(2);
}

const configFile = ts.readConfigFile(absTsconfig, ts.sys.readFile);
if (configFile.error) {
  console.error('Failed to read tsconfig:', configFile.error);
  process.exit(2);
}

const parsed = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  path.dirname(absTsconfig)
);

const options = parsed.options;
console.log('Using tsconfig:', absTsconfig);
console.log('Effective compilerOptions:', JSON.stringify(options, null, 2));
console.log('---');

const absFile = path.resolve(fileToTrace);
if (!fs.existsSync(absFile)) {
  console.error('File to trace not found:', absFile);
  process.exit(2);
}

const srcText = fs.readFileSync(absFile, 'utf8');
const src = ts.createSourceFile(absFile, srcText, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX);

function collectImports(sf) {
  const imports = new Set();
  function walk(node) {
    if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      imports.add(node.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      imports.add(node.moduleSpecifier.text);
    } else if (ts.isCallExpression(node) && node.expression && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const arg = node.arguments[0];
      if (arg && ts.isStringLiteral(arg)) imports.add(arg.text);
    }
    ts.forEachChild(node, walk);
  }
  walk(sf);
  return Array.from(imports);
}

const imports = collectImports(src);
console.log('Found import specifiers:', imports);
console.log('---');

function traceModule(specifier) {
  console.log(`Resolving '${specifier}' from '${absFile}'`);
  const res = ts.resolveModuleName(specifier, absFile, options, ts.sys);
  if (res && res.resolvedModule) {
    console.log('  resolved:', res.resolvedModule.resolvedFileName);
    console.log('  extension:', res.resolvedModule.extension);
    console.log('  resolvedWithTsSuffix?:', res.resolvedModule.resolvedWithTsSuffix ? true : false);
  } else {
    console.log('  NOT resolved. Failure info:');
    if (res && res.failedLookupLocations && res.failedLookupLocations.length) {
      res.failedLookupLocations.forEach((l) => console.log('    -', l));
    } else {
      console.log('    (no detailed failedLookupLocations available)');
    }
  }
  console.log('');
}

if (imports.length === 0) {
  console.log('No static imports/exports found; tracing a few common module names as examples.');
  ['@/components/global/Nav', '@/components/panels/Hero', 'react'].forEach(traceModule);
} else {
  imports.forEach(traceModule);
}

console.log('Trace complete.');

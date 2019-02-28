// Adds ability to create a render from command line.
// $ node src/cli.js <opts>
// opts must be a base 64 encoded json string and include url and pdf.path for output
const renderCore = require('./core/render-core');

if (process.argv.length !== 3) {
  console.log('usage:\n$ node src/cli.js <opts>\nopts must be a base 64 encoded json string and include url and pdf.path for output');
  process.exit();
}

const b64string = process.argv[2];
const opts = JSON.parse(Buffer.from(b64string, 'base64').toString('ascii'));
if (!opts) {
  console.log('invalid opts');
  process.exit();
}

if (!opts.url) {
  console.log('no url supplied');
  process.exit();
}

if (!opts.pdf || !opts.pdf.path) {
  console.log('no pdf.path opt');
  process.exit();
}

(async () => {
  renderCore.render(opts)
    .then((data) => {
      console.log('SUCCESS=TRUE');
      // process.stdout.write(data);
    });
})();

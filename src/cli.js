// Adds ability to create a render from command line.
// $ node src/cli.js <opts>
// opts must be a base 64 encoded json string and include url and pdf.path for output
const renderCore = require('./core/render-core');

const b64string = process.argv[2];
const opts = JSON.parse(Buffer.from(b64string, 'base64').toString('ascii'));
if (!opts) {
  process.exit('invalid opts');
}

if (!opts.url) {
  process.exit('no url supplied');
}

if (!opts.pdf || !opts.pdf.path) {
  process.exit('no pdf.path opt');
}

(async () => {
  renderCore.render(opts)
    .then((data) => {
      console.log('SUCCESS=TRUE');
      // process.stdout.write(data);
    });
})();

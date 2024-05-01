import { Readable, Writable, Transform } from "node:stream";

const toBuffer = (chunk) => Buffer.from(String(chunk));

class OneToHundredStream extends Readable {
  index = 0;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i < 100) {
        const buf = toBuffer(i);

        return this.push(buf);
      }
    }, 1000);
  }
}

class NegationStream extends Transform {
  _transform(chunk, _, callback) {
    const transformed = Number(String(chunk)) * -1;
    callback(null, toBuffer(transformed));
  }
}

class MutiplyByTenStream extends Writable {
  _write(chunk, _, callback) {
    console.log(Number(String(chunk)) * 10);
    callback();
  }
}

new OneToHundredStream().pipe(new NegationStream()).pipe(new MutiplyByTenStream());

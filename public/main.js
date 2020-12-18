const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "../posts");
let postList = [];
const getPost = () => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return console.log(
        `Faild to read the files in the directory: ${err.message}`
      );
    }
    files.forEach((file, i) => {
      let obj = {};
      let post;
      fs.readFile(`${dirPath}/${file}`, "utf8", (err, contents) => {
        const getMetadataIndices = (accum, element, index) => {
          if (/^---/.test(element)) {
            accum.push(index);
          }
          return accum;
        };
        const parseMetadata = (lines, metadataindices) => {
          if (metadataindices.length > 0) {
            let metadata = lines.slice(
              metadataindices[0] + 1,
              metadataindices[1]
            );
            metadata.forEach((line) => {
              obj[line.split(": ")[0]] = line.split(": ")[1];
            });
            return obj;
          }
        };
        const parsContent = (line, metadataindices) => {
          if (metadataindices.length > 0) {
            line = line.slice(metadataindices[1] + 1, line.length);
          }
          return line.join("\n");
        };
        const lines = contents.split("\n");
        const MetadataIndices = lines.reduce(getMetadataIndices, []);
        const metadata = parseMetadata(lines, MetadataIndices);
        const content = parsContent(lines, MetadataIndices);
        const date = new Date(metadata.date);
        const timestamp = date.getTime() / 10000;
        post = {
          id: timestamp,
          title: metadata.title ? metadata.title : "No title given",
          author: metadata.author ? metadata.author : "No author provided",
          date: metadata.date ? metadata.date : "No date given",
          content: content ? content : "No content given",
        };
        postList.push(post);
        if (i === files.length - 1) {
          const sortedlist = postList.sort((a, b) => {
            return a.id < b.id ? 1 : -1;
          });
          const data = JSON.stringify(sortedlist);
          fs.writeFileSync("src/post.json", data);
        }
      });
    });
  });
  return;
};
getPost();

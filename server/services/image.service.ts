import { Form } from "multiparty";

export const uploadFile = req =>
    new Promise<any>((resolve, reject) => {
        const contentType = req.headers["content-type"];
        if (contentType && contentType.indexOf("multipart") === 0) {
            const form = new Form({
                autoFiles: true,
                uploadDir: "public/files/",
                maxFilesSize: 1048576 * 3
            });
            form.parse(req, function (err, fields, files): any {
                if (err) return reject(err);

                if (files.file) {
                    const imageUrl = files.file[0].path;
                    let url;
                    url =
                        imageUrl.indexOf("\\") !== -1
                            ? imageUrl.split(`\\`)
                            : imageUrl.split(`/`);
                    url.shift();
                    url = url.join("/");

                    url = "/" + url;
                    return resolve(url);
                }
            });
        }
        else {
            reject(new Error("Bad request"));
        }
    })
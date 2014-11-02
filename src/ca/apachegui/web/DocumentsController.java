package ca.apachegui.web;

import apache.conf.parser.File;

import java.nio.charset.Charset;
import java.util.Arrays;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apache.conf.global.Utils;
import ca.apachegui.docs.DocFiles;
import ca.apachegui.global.Constants;

@RestController
@RequestMapping("/web/Documents")
public class DocumentsController {
    private static Logger log = Logger.getLogger(DocumentsController.class);

    @RequestMapping(method = RequestMethod.GET, params = "option=documentsList", produces = "application/json;charset=UTF-8")
    public String getActiveFileList() throws Exception {

        String documentsList[] = DocFiles.getDirectories();
        Arrays.sort(documentsList);

        JSONArray files = new JSONArray();
        for (int i = 0; i < documentsList.length; i++) {
            files.put(documentsList[i]);
        }

        JSONObject result = new JSONObject();
        result.put("files", files);

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=save", produces = "application/json;charset=UTF-8")
    public String saveDocuments(@RequestParam(value = "content") String content, @RequestParam(value = "path") String path) throws Exception {

        log.trace("content " + content);
        log.trace("path " + path);

        File file = new File(path);
        FileUtils.write(file, content, Charset.forName("UTF-8"), false);

        long modifiedTime = -1;
        modifiedTime = file.lastModified();

        JSONObject result = new JSONObject();
        result.put("result", "The save was a success!");
        result.put("time", Long.toString(modifiedTime));

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=getFileAsString", produces = "text/plain;charset=UTF-8")
    public String getDocumentsFileAsString(@RequestParam(value = "file") String path) throws Exception {

        String fileText = "";
        File file = new File(path);
        try {
            if (file.length() < Constants.maximumDocumentFilesize) {
                fileText = Utils.readFileAsString(file, Charset.forName("UTF-8"));
            } else {
                fileText = "The Document is too large to render. The document must be less than " + Constants.maximumDocumentFilesize + " Bytes";
            }
        } catch (Exception e) {
            fileText = "File Not Found!!";
        }

        return fileText;
    }

}

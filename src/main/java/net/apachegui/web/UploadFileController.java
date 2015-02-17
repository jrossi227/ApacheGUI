package net.apachegui.web;

import apache.conf.global.Utils;
import apache.conf.parser.File;

import java.util.Random;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UploadFileController {
    private static Logger log = Logger.getLogger(UploadFileController.class);

    @RequestMapping(value = "/web/UploadFile", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public String uploadMultipleFileHandler(@RequestParam("uploadFiles[]") MultipartFile[] files, @RequestParam("uploadDirectoryName") String uploadDirectory) throws Exception {

        JSONArray results = new JSONArray();

        MultipartFile file;
        for (int i = 0; i < files.length; i++) {
            file = files[i];
            results.put(processUploadedFile(file, uploadDirectory));
        }

        return results.toString();
    }

    private JSONObject processUploadedFile(MultipartFile file, String uploadDirectory) throws Exception {
        String fileName = file.getOriginalFilename();
        String contentType = file.getContentType();

        File uploadedFile = new File(uploadDirectory, fileName);
        file.transferTo(uploadedFile);

        Utils.setPermissions(new File(uploadedFile.getAbsolutePath()));

        log.debug(fileName + ", " + contentType + ", " + uploadedFile.length());

        JSONObject result = new JSONObject();
        result.put("fileName", fileName);
        result.put("contentType", contentType);
        result.put("size", uploadedFile.length());
        result.put("id", Long.toString(System.currentTimeMillis() + new Random().nextInt(100)));

        return result;
    }
}

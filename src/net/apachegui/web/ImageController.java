package net.apachegui.web;

import apache.conf.parser.File;

import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController {

    @Autowired
    ServletContext servletContext;

    @RequestMapping(value = "/web/Image", method = RequestMethod.GET)
    public void imageHandler(@RequestParam("file") String fileName, HttpServletResponse response) throws IOException {

        File file = new File(fileName);

        String mimeType = servletContext.getMimeType(file.getName());
        if (mimeType == null) {
            mimeType = "application/octet-stream";
        }

        response.setContentType(mimeType);
        response.setHeader("Cache-Control", "");
        response.setHeader("Pragma", "");
        response.setContentLength((int) file.length());

        FileInputStream in = new FileInputStream(file);
        IOUtils.copy(in, response.getOutputStream());
        response.flushBuffer();
    }
}

package net.apachegui.web;

import apache.conf.parser.File;
import net.apachegui.conf.ConfFiles;
import net.apachegui.conf.Configuration;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.regex.Pattern;

@RestController
@RequestMapping("/web/ConfigurationTree")
public class ConfigurationTreeController {

    private final String LINE_TYPE_ENCLOSURE = "enclosure";

    private JSONObject populateFileModifiedResponse(String file) {

        JSONObject result = new JSONObject();
        result.put("result", "success");
        result.put("lastModifiedTime", new File(file).lastModified());
        result.put("file", file);

        return result;

    }

    @RequestMapping(method = RequestMethod.POST, params = "option=editLine", produces = "application/json;charset=UTF-8")
    public String editLine(@RequestParam(value = "type") String type,
                           @RequestParam(value = "value") String value,
                           @RequestParam(value = "lineType") String lineType,
                           @RequestParam(value = "file") String file,
                           @RequestParam(value = "lineOfStart") int lineOfStart,
                           @RequestParam(value = "lineOfEnd") int lineOfEnd) throws Exception {

        String line;
        if(lineType.equals(LINE_TYPE_ENCLOSURE)) {
            line = "<" + type + " " + value + ">";
        } else {
            line = type + " " + value;
        }

        String originalContents = ConfFiles.replaceLinesInConfigFile(new File(file), new String[]{line}, lineOfStart, lineOfEnd);

        Configuration.testChanges(file, originalContents);

        JSONObject result = populateFileModifiedResponse(file);

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=deleteLine", produces = "application/json;charset=UTF-8")
    public String deleteLine(@RequestParam(value = "file") String file,
                             @RequestParam(value = "lineOfStart") int lineOfStart,
                             @RequestParam(value = "lineOfEnd") int lineOfEnd) throws Exception {

        String originalContents = ConfFiles.deleteFromConfigFile(Pattern.compile(".*", Pattern.CASE_INSENSITIVE), new File(file), lineOfStart, lineOfEnd, true);

        Configuration.testChanges(file, originalContents);

        JSONObject result = populateFileModifiedResponse(file);

        return result.toString();
    }

}
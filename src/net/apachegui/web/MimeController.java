package net.apachegui.web;

import net.apachegui.conf.AddedMime;
import net.apachegui.conf.ServerMime;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apache.conf.global.Utils;

@RestController
@RequestMapping("/web/Mime")
public class MimeController {

    @RequestMapping(method = RequestMethod.GET, params = "option=serverMimes", produces = "application/json;charset=UTF-8")
    public String serverMimes() throws Exception {

        net.apachegui.conf.Mime mimes[] = ServerMime.getAll();

        JSONObject result = new JSONObject();
        result.put("identifier", "id");
        result.put("label", "name");

        JSONArray items = new JSONArray();

        JSONObject item;
        for (int i = 0; i < mimes.length; i++) {
            item = new JSONObject();
            item.put("id", Integer.toString((i + 1)));
            item.put("type", mimes[i].getType());

            String extensions[] = mimes[i].getExtensions();
            StringBuffer currentExtension = new StringBuffer();
            for (int j = 0; j < extensions.length; j++) {
                currentExtension.append(extensions[j]);
                currentExtension.append(" ");
            }

            item.put("extensions", currentExtension.toString().trim());

            items.put(item);
        }

        result.put("items", items);

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=addedMimes", produces = "application/json;charset=UTF-8")
    public String addedMimes() throws Exception {

        net.apachegui.conf.Mime mimes[] = AddedMime.getAll();

        JSONObject result = new JSONObject();
        result.put("identifier", "id");
        result.put("label", "name");

        JSONArray items = new JSONArray();

        JSONObject item;
        for (int i = 0; i < mimes.length; i++) {
            item = new JSONObject();
            item.put("id", Integer.toString((i)));
            item.put("type", mimes[i].getType());

            String extensions[] = mimes[i].getExtensions();
            StringBuffer currentExtension = new StringBuffer();
            for (int j = 0; j < extensions.length; j++) {
                currentExtension.append(extensions[j]);
                currentExtension.append(" ");
            }

            item.put("extensions", currentExtension.toString().trim());

            items.put(item);
        }

        result.put("items", items);

        return result.toString();
    }

    private String printSuccess() {
        JSONObject result = new JSONObject();
        result.put("result", "success");
        return result.toString();
    }

    private String[] extractExtensionList(String type, String extensions) {

        type = type.trim();
        String extensionList = Utils.sanitizeLineSpaces(extensions).replaceAll(",", "");

        return extensionList.split(" ");

    }

    @RequestMapping(method = RequestMethod.POST, params = "option=addMime", produces = "application/json;charset=UTF-8")
    public String addMime(@RequestParam(value = "type") String type, @RequestParam(value = "extensions") String extensions) throws Exception {

        String extensionList[] = extractExtensionList(type, extensions);

        AddedMime.add(new AddedMime(type, extensionList));

        return printSuccess();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=editMime", produces = "application/json;charset=UTF-8")
    public String editMime(@RequestParam(value = "type") String type, @RequestParam(value = "extensions") String extensions) throws Exception {

        String extensionList[] = extractExtensionList(type, extensions);

        AddedMime.edit(new AddedMime(type, extensionList));

        return printSuccess();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=removeMime", produces = "application/json;charset=UTF-8")
    public String removeMime(@RequestParam(value = "type") String type, @RequestParam(value = "extensions") String extensions) throws Exception {

        String extensionList[] = extractExtensionList(type, extensions);

        AddedMime.remove(new AddedMime(type, extensionList));

        return printSuccess();
    }
}

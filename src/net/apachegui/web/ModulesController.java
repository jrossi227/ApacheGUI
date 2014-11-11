package net.apachegui.web;

import java.util.ArrayList;
import java.util.Arrays;

import net.apachegui.conf.Configuration;
import net.apachegui.modules.ModuleHandler;
import net.apachegui.modules.SharedModuleHandler;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apache.conf.modules.AvailableModule;
import apache.conf.modules.SharedModule;
import apache.conf.modules.StaticModule;

@RestController
@RequestMapping("/web/Modules")
public class ModulesController {
    private static Logger log = Logger.getLogger(ModulesController.class);

    @RequestMapping(method = RequestMethod.GET, params = "option=static", produces = "application/json;charset=UTF-8")
    public String staticModules() throws Exception {

        StaticModule modules[] = net.apachegui.modules.StaticModuleHandler.getStaticModules();
        Arrays.sort(modules);

        JSONObject result = new JSONObject();
        result.put("identifier", "id");
        result.put("label", "name");

        JSONArray items = new JSONArray();

        JSONObject item;
        for (int i = 0; i < modules.length; i++) {
            item = new JSONObject();
            item.put("id", modules[i].getName());
            item.put("name", modules[i].getName());
            item.put("type", "static");

            items.put(item);
        }

        result.put("items", items);

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=shared", produces = "application/json;charset=UTF-8")
    public String sharedModules() throws Exception {

        SharedModuleHandler.updateSharedModules();
        SharedModule modules[] = net.apachegui.modules.SharedModuleHandler.getSharedModules();
        Arrays.sort(modules);

        JSONObject result = new JSONObject();
        result.put("identifier", "id");
        result.put("label", "name");

        JSONArray items = new JSONArray();

        JSONObject item;
        for (int i = 0; i < modules.length; i++) {
            item = new JSONObject();
            item.put("id", modules[i].getName());
            item.put("name", modules[i].getName());
            item.put("type", "shared");
            item.put("status", "Loaded");

            items.put(item);
        }

        result.put("items", items);

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=available", produces = "application/json;charset=UTF-8")
    public String availableModules() throws Exception {

        SharedModuleHandler.updateSharedModules();
        AvailableModule modules[] = net.apachegui.modules.AvailableModuleHandler.getAvailableModules();
        Arrays.sort(modules);

        JSONObject result = new JSONObject();
        result.put("identifier", "id");
        result.put("label", "name");

        JSONArray items = new JSONArray();

        JSONObject item;
        for (int i = 0; i < modules.length; i++) {
            item = new JSONObject();
            item.put("id", modules[i].getName());
            item.put("name", modules[i].getName());
            item.put("filename", modules[i].getFilename());
            item.put("status", "available");

            items.put(item);
        }

        result.put("items", items);

        return result.toString();
    }

    @RequestMapping(method = RequestMethod.POST, params = "option=removeSharedModules", produces = "application/json;charset=UTF-8")
    public String removeSharedModules(@RequestParam(value = "sharedModules") String sharedModules) throws Exception {
        String modules[] = sharedModules.split(":");
        ArrayList<String> removedModules = new ArrayList<String>();
        for (int i = 0; i < modules.length; i++) {
            log.trace("Searching For module " + modules[i]);

            boolean removed = SharedModuleHandler.removeModule(modules[i]);

            if (removed) {
                removedModules.add(ModuleHandler.getModuleConfigString(modules[i]));
            }
        }

        log.trace("Checking the server configuration");
        String status = Configuration.testServerConfiguration();
        if (!status.matches(".*(?i:syntax ok).*")) {
            StringBuffer loadModules = new StringBuffer();
            loadModules.append("<br/>To revert uncomment the following directives:<br/>");
            for (int i = 0; i < removedModules.size(); i++) {
                loadModules.append("<span style=\"font-weight:bold;\">" + removedModules.get(i) + "</span><br/>");
            }
            throw new Exception("There is an error with the configuration, the changes were reverted: " + status + loadModules.toString());
        }

        SharedModuleHandler.updateSharedModules();

        JSONObject result = new JSONObject();
        result.put("result", "success");
        return result.toString();
    }

    @RequestMapping(method = RequestMethod.GET, params = "option=getLoadDirective", produces = "application/json;charset=UTF-8")
    public String getLoadDirective(@RequestParam(value = "name") String name) throws Exception {

        String directive = ModuleHandler.getModuleConfigString(name);

        JSONObject result = new JSONObject();
        result.put("directive", directive);
        return result.toString();

    }
}

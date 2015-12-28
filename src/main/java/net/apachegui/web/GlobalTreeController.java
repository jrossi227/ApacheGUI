package net.apachegui.web;

import apache.conf.parser.EnclosureParser;
import apache.conf.parser.ParsableLine;
import apache.conf.parser.Parser;
import net.apachegui.conf.ConfigurationTree;
import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web/GlobalTree")
public class GlobalTreeController {

    @RequestMapping(method = RequestMethod.GET, params = "option=getGlobalTree", produces = "application/json;charset=UTF-8")
    public String getGlobalTree() throws NullPointerException, Exception {

        Parser parser = new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());

        ParsableLine parsableLines[] = parser.getConfigurationParsableLines(true);

        JSONObject tree = new JSONObject();
        tree.put("tree", ConfigurationTree.toTreeJSON(parsableLines, "Configuration"));

        return tree.toString();

    }


}

package net.apachegui.conf;

import apache.conf.parser.*;
import net.apachegui.db.SettingsDao;
import net.apachegui.global.Constants;
import net.apachegui.global.Utilities;
import net.apachegui.modules.SharedModuleHandler;
import net.apachegui.modules.StaticModuleHandler;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;

public class ConfigurationTree {

    private static String getNameFromParts(String parts[]) {
        String name = Utilities.join(parts, " ");

        name = "<span class=\"directive_type\">" + name.replaceFirst(" ", "</span><span class=\"directive_value\"> ");
        name += "</span>";

        return name;
    }

    public static JSONObject toTreeJSON(ParsableLine parsableLines[], String rootNodeName) throws Exception {

        JSONObject tree = new JSONObject();
        tree.put("identifier", "id");
        tree.put("label", "name");

        JSONArray items = new JSONArray();

        JSONObject children = new JSONObject();

        children.put("id", "0");
        children.put("name", rootNodeName);
        children.put("type", "rootNode");
        children.put("value", "");
        children.put("file", SettingsDao.getInstance().getSetting(Constants.CONF_FILE));
        children.put("lineOfStart", -1);
        children.put("lineOfEnd", -1);
        children.put("lineType", "rootNode");

        //clean the input lines
        ArrayList<ParsableLine> cleanParsableLines = new ArrayList<ParsableLine>();
        for(ParsableLine parsableLine : parsableLines) {
            if(     parsableLine.isInclude() &&
                    !parsableLine.getConfigurationLine().isComment() &&
                    !parsableLine.getConfigurationLine().getProcessedLine().equals("")) {
                cleanParsableLines.add(parsableLine);
            }
        }
        children.put("children", toTreeJSON(cleanParsableLines.toArray(new ParsableLine[cleanParsableLines.size()]), 1));

        items.put(children);

        tree.put("items", items);

        return tree;
    }

    //meat and bones of processing here
    private static JSONArray toTreeJSON(ParsableLine parsableLines[], int lineNum) throws Exception {

        JSONArray enclosureArray = new JSONArray();

        EnclosureParser parser = new EnclosureParser(SettingsDao.getInstance().getSetting(Constants.CONF_FILE), SettingsDao.getInstance().getSetting(Constants.SERVER_ROOT),
                StaticModuleHandler.getStaticModules(), SharedModuleHandler.getSharedModules());

        int enclosureCount = 0;
        ConfigurationLine configurationLine;
        String line;
        for(int i=0; i<parsableLines.length; i++) {
            lineNum ++;

            configurationLine = parsableLines[i].getConfigurationLine();
            line = configurationLine.getProcessedLine();

            if(Parser.isEnclosureMatch(line)) {
                ArrayList<ParsableLine> enclosureParsableLines = new ArrayList<ParsableLine>();
                int treeCount = 0;
                String enclosureType = EnclosureParser.extractEnclosureToParts(line)[0];
                String strLine;
                while(true) {
                    enclosureParsableLines.add(parsableLines[i]);
                    strLine = parsableLines[i].getConfigurationLine().getProcessedLine();

                    if (Parser.isEnclosureTypeMatch(strLine, enclosureType)) {
                        treeCount++;
                    }

                    if (Parser.isCloseEnclosureTypeMatch(strLine, enclosureType)) {
                        treeCount--;

                        if (treeCount == 0) {
                            break;
                        }
                    }

                    i++;
                }

                Enclosure enclosure = parser.parseEnclosure(enclosureParsableLines.toArray(new ParsableLine[enclosureParsableLines.size()]), true);

                String parts[] = EnclosureParser.extractEnclosureToParts(line);
                String name = getNameFromParts(parts);

                JSONObject children = new JSONObject();
                children.put("id", String.valueOf(lineNum));
                children.put("name", name);
                children.put("type", parts[0]);
                children.put("value", name.replaceAll("<span.*</span> ", ""));
                children.put("file", configurationLine.getFile());
                children.put("lineOfStart", configurationLine.getLineOfStart());
                children.put("lineOfEnd", configurationLine.getLineOfEnd());
                children.put("lineType", "enclosure");
                children.put("enclosureLineOfStart", enclosure.getLineOfStart());
                children.put("enclosureLineOfEnd", enclosure.getLineOfEnd());
                children.put("children", toTreeJSON(enclosure, lineNum));

                //iterate the line counter with the number of lines in the enclosure
                lineNum += (enclosure.getLineOfEnd() - enclosure.getLineOfStart());

                enclosureArray.put(children);
            } else if((!Parser.isEnclosureMatch(line) && !Parser.isCloseEnclosureMatch(line))) {
                String parts[] = DirectiveParser.extractDirectiveToParts(line);
                String name = getNameFromParts(parts);

                JSONObject directive = new JSONObject();
                directive.put("id", String.valueOf(lineNum));
                directive.put("name", name);
                directive.put("type", parts[0]);
                directive.put("value", name.replaceAll("<span.*</span> ", ""));
                directive.put("file", configurationLine.getFile());
                directive.put("lineOfStart", configurationLine.getLineOfStart());
                directive.put("lineOfEnd", configurationLine.getLineOfEnd());
                directive.put("lineType", "directive");

                enclosureArray.put(directive);

            }
        }

        return enclosureArray;
    }

    public static JSONObject toTreeJSON(Enclosure enclosure) {

        JSONObject tree = new JSONObject();
        tree.put("identifier", "id");
        tree.put("label", "name");

        JSONArray items = new JSONArray();

        String line = enclosure.getConfigurationLines()[0].getProcessedLine();

        String parts[] = EnclosureParser.extractEnclosureToParts(line);
        String name = getNameFromParts(parts);

        JSONObject children = new JSONObject();
        children.put("id", "0");
        children.put("name", name);
        children.put("type", parts[0]);
        children.put("value", name.replaceAll("<span.*</span> ", ""));
        children.put("file", enclosure.getConfigurationLines()[0].getFile());
        children.put("lineOfStart", enclosure.getConfigurationLines()[0].getLineOfStart());
        children.put("lineOfEnd", enclosure.getConfigurationLines()[0].getLineOfEnd());
        children.put("lineType", "enclosure");
        children.put("enclosureLineOfStart", enclosure.getLineOfStart());
        children.put("enclosureLineOfEnd", enclosure.getLineOfEnd());
        children.put("children", toTreeJSON(enclosure, 1));
        items.put(children);

        tree.put("items", items);

        return tree;
    }

    //meat and bones of processing here
    private static JSONArray toTreeJSON(Enclosure enclosure, int lineNum) {

        JSONArray enclosureArray = new JSONArray();

        ConfigurationLine configurationLines[] = enclosure.getConfigurationLines();

        int enclosureCount = 0;
        String line;
        for(int i=0; i<configurationLines.length; i++) {
            lineNum ++;

            line = configurationLines[i].getProcessedLine();

            if(Parser.isEnclosureMatch(line) && i > 0) {
                String parts[] = EnclosureParser.extractEnclosureToParts(line);
                String name = getNameFromParts(parts);

                JSONObject children = new JSONObject();
                children.put("id", String.valueOf(lineNum));
                children.put("name", name);
                children.put("type", parts[0]);
                children.put("value", name.replaceAll("<span.*</span> ", ""));
                children.put("file", configurationLines[i].getFile());
                children.put("lineOfStart", configurationLines[i].getLineOfStart());
                children.put("lineOfEnd", configurationLines[i].getLineOfEnd());
                children.put("lineType", "enclosure");
                children.put("enclosureLineOfStart", enclosure.getEnclosures()[enclosureCount].getLineOfStart());
                children.put("enclosureLineOfEnd", enclosure.getEnclosures()[enclosureCount].getLineOfEnd());
                children.put("children", toTreeJSON(enclosure.getEnclosures()[enclosureCount], lineNum));

                //iterate the line counter with the number of lines in the enclosure
                lineNum += (enclosure.getEnclosures()[enclosureCount].getLineOfEnd() - enclosure.getEnclosures()[enclosureCount].getLineOfStart());

                enclosureArray.put(children);
                enclosureCount ++;
            } else if((!Parser.isEnclosureMatch(line) && !Parser.isCloseEnclosureMatch(line))) {
                String parts[] = DirectiveParser.extractDirectiveToParts(line);
                String name = getNameFromParts(parts);

                JSONObject directive = new JSONObject();
                directive.put("id", String.valueOf(lineNum));
                directive.put("name", name);
                directive.put("type", parts[0]);
                directive.put("value", name.replaceAll("<span.*</span> ", ""));
                directive.put("file", configurationLines[i].getFile());
                directive.put("lineOfStart", configurationLines[i].getLineOfStart());
                directive.put("lineOfEnd", configurationLines[i].getLineOfEnd());
                directive.put("lineType", "directive");

                enclosureArray.put(directive);

            }
        }

        return enclosureArray;
    }


}

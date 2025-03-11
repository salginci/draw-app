//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {

    var self = this;

    this.tools = [];
    this.selectedTool = null;
    this.toolStates = new Map();

    var toolbarItemClick = function () {
        //remove any existing borders
        var items = selectAll(".sideBarItem");
        for (var i = 0; i < items.length; i++) {
            items[i].style('border', '0')
        }

        var toolName = this.id().split("sideBarItem")[0];
        self.selectTool(toolName);

        //call loadPixels to make sure most recent changes are saved to pixel array
        loadPixels();

    }

    //add a new tool icon to the html page
    var addToolIcon = function (icon, name) {
        var sideBarItem = createDiv("<img style='background:#fff' src='" + icon + "'></img>");
        sideBarItem.class('sideBarItem')
        sideBarItem.id(name + "sideBarItem")
        sideBarItem.parent('sidebar');
        sideBarItem.mouseClicked(toolbarItemClick);


    };

    //add a tool to the tools array
    this.addTool = function (tool) {
        //check that the object tool has an icon and a name
        if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
            alert("make sure your tool has both a name and an icon");
        }
        this.tools.push(tool);
        addToolIcon(tool.icon, tool.name);
        //if no tool is selected (ie. none have been added so far)
        //make this tool the selected one.
        if (this.selectedTool == null) {
            this.selectTool(tool.name);
        }
    };

    this.selectTool = function (toolName) {
        for (var i = 0; i < this.tools.length; i++) {
            if (this.tools[i].name == toolName) {
                // Unselect current tool if exists
                if (this.selectedTool != null) {
                    if (this.selectedTool.hasOwnProperty("unselectTool")) {
                        this.selectedTool.unselectTool();
                    }
                    select(".options").html("");
                }

                // Select new tool
                this.selectedTool = this.tools[i];
                select("#" + toolName + "sideBarItem").style("border", "2px solid rgb(247 97 12)");

                // Call selectTool if it exists
                if (this.selectedTool.hasOwnProperty("selectTool")) {
                    this.selectedTool.selectTool();
                }

                // Set up options
                if (this.selectedTool.hasOwnProperty("populateOptions")) {
                    this.selectedTool.populateOptions();
                    select(".options").style('background-color', 'rgb(191 191 191)');
                } else {
                    select(".options").style('background-color', '#34349d');
                }
            }
        }
    };

    this.saveToolState = function(toolName, state) {
        this.toolStates.set(toolName, state);
    };

    this.getToolState = function(toolName) {
        return this.toolStates.get(toolName);
    };

}

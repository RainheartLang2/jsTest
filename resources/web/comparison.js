
class EventTypesConstants {
    constructor() {
        this.INIT = "INIT";
    }
}

const EventTypes = new EventTypesConstants();

class GlobalController {
    constructor() {
        this.state = 'INITIAL';
        this.handlers = this.initHandlers();
    }

    initHandlers() {
        const initialHandler = new Handler("INITIAL");
        const comparisonHandler = new Handler("PROCESSING");
        // comparisonHandler.handle =
        return new Map([
            [EventTypes.INIT, initialHandler],
            ["COMPARE", null],
            ["STOP", null],
            ["SUCCESS", null],
            ["ERROR", null]
        ]);
    }


    getHandler(eventType) {
        const result = this.handlers.get(eventType);
        if (!result) {
            const error = {"message" : "Неизвестный eventType - " + eventType};
            throw error;
        }
        return result;
    }

    handleEvent(event) {
        try {
            this.state = this.getHandler(event.type).handle(event.data);
        }
        catch (e) {
            alert("Ошибка: "  + e.message);
        }
    }
}

class Handler {
    constructor(state, ...view) {
        this.viewList = view;
    }

    businessHandle(eventData) {}

    visualHandle(eventData) {
        for (let item in this.viewList) {
            item.render(eventData);
        }
    }

    getState() {
        return this.state;
    }
    handle(eventData) {
        this.businessHandle();
        this.visualHandle();
    }
}

const global = new GlobalController();

const initEvent = {
    type : EventTypes.INIT
}

global.handleEvent(initEvent);
alert("initiated");
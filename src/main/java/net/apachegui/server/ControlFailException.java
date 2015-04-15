package net.apachegui.server;


public class ControlFailException extends Exception {

    private String output;

    public ControlFailException(String output) {
        this.output = output;
    }

    public String getOutput() {
        return output;
    }

    @Override
    public String getMessage() {
        return output;
    }

}

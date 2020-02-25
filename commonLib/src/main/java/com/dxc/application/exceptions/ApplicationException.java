package com.dxc.application.exceptions;

public class ApplicationException extends Exception {
    private static final long serialVersionUID = 1L;

    private String messageCode;

    private Object param[];

    public ApplicationException() {
        super();
    }

    public ApplicationException(String messageCode) {
        // super(message);
        this.messageCode = messageCode;
    }

    public ApplicationException(String messageCode, Object[] param) {
        // super();
        this.messageCode = messageCode;
        this.param = param;
    }

    public String getMessageCode() {
        return messageCode;
    }

    public Object[] getParam() {
        return param;
    }

    public void setMessageCode(String messageCode) {
        this.messageCode = messageCode;
    }

    public void setParam(Object[] param) {
        this.param = param;
    }
}

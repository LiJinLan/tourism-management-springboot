package com.tourism.management.exception;


import com.tourism.management.constant.CodeEnum;;

public class TourismException extends RuntimeException {
	
    private String code;
    private String desc;

    public TourismException(CodeEnum codeEnum) {
        this.code = codeEnum.code();
        this.desc = codeEnum.desc();
    }

    public TourismException(String code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public String getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }

    @Override
    public String getMessage() {
        return this.desc;
    }
}

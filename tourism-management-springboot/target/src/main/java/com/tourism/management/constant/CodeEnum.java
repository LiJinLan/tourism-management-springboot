package com.tourism.management.constant;

public enum CodeEnum {
	
	SUCCESS("0", "成功");

    String code;
    String desc;

    private CodeEnum(String code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public String code() {
        return code;
    }

    public String desc() {
        return desc;
    }
}

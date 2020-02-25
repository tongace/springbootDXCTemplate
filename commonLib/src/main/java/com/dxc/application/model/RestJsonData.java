package com.dxc.application.model;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RestJsonData<T> {
    private String message;
    private BigDecimal rowCount;
    private List<T> datas = Collections.emptyList();
}

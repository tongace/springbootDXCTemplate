package com.dxc.config;

import org.apache.camel.CamelContext;
import org.apache.camel.spring.SpringCamelContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;

import th.co.toyota.st3.api.download.CST30090ExcelGenerator;
import th.co.toyota.st3.api.download.CST30091Downloader;
import th.co.toyota.st3.api.report.CST30170JasperReportConnector;
import th.co.toyota.st3.api.util.CST30000BatchManager;
import th.co.toyota.st3.api.util.CST32010DocNoGenerator;

@Configuration
@PropertySource({"classpath:demo-application.properties"})
public class ToyotaStandardConfig {
	@Autowired
    private ApplicationContext applicationContext;

    @Bean
    public CamelContext camelContext() {
        return new SpringCamelContext(applicationContext);
    }
    
    @Value("${jr.template.folder}")
    private String jrTemplateFolder;
    @Value("${jr.destination.folder}")
    private String jrDestinationFolder;
    @Value("${jr.virtualizer.folder}")
    private String jrVirtualizerFolder;
    @Value("${jr.virtualMaxSize}")
    private int jrvirtualMaxSize;
    
    @Bean
    @Scope("prototype")
    public CST30170JasperReportConnector CST30170JasperReportConnector() {
    	CST30170JasperReportConnector bean = new CST30170JasperReportConnector();
    	bean.setTemplateFolder(jrTemplateFolder);
    	bean.setDestinationFolder(jrDestinationFolder);
    	bean.setVirtualizerFolder(jrVirtualizerFolder);
    	bean.setVirtualMaxSize(jrvirtualMaxSize);
    	return bean;
    }
    
    @Value("${rowsperpage}")
    private int rowsperpage;
    @Value("${default.download.folder}")
    private String defaultDownloadFolder;
    @Value("${report.dateformat}")
    private String reportDateformat;
    
    @Bean
    @Scope("prototype")
    public CST30090ExcelGenerator CST30090ExcelGenerator() {
    	CST30090ExcelGenerator bean = new CST30090ExcelGenerator();
    	bean.setMaxRowsPerPage(rowsperpage);
    	bean.setDateTimeFormat(reportDateformat);
    	bean.setSharedFolder(defaultDownloadFolder);
    	return bean;
    }
    @Bean
    @Scope("prototype")
    public CST30091Downloader CST30091Downloader() {
    	CST30091Downloader bean = new CST30091Downloader();
    	bean.setDefaultPath(defaultDownloadFolder);
    	return bean;
    }
    @Bean
    @Scope("prototype")
    public CST32010DocNoGenerator CST32010DocNoGenerator() {
    	return new CST32010DocNoGenerator();
    }
    @Bean
    @Scope("prototype")
    public CST30000BatchManager CST30000BatchManager() {
    	return new CST30000BatchManager();
    }
    
}

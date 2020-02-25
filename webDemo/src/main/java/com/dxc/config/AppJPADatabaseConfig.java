package com.dxc.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan
@EnableTransactionManagement
@PropertySource(value = { "classpath:data-access.properties" })
public class AppJPADatabaseConfig {
	@Value("${jdbc.driverClassName}")
	private String jdbcDriverClassName;
	@Value("${jdbc.url}")
	private String jdbcURL;
	@Value("${jdbc.username}")
	private String jdbcUserName;
	@Value("${jdbc.password}")
	private String jdbcPassword;
	@Value("${jpa.database}")
	private String jpaDatabase;
	@Value("${jpa.showSql}")
	private String jpaShowSql;
	@Value("${hibernate.dialect}")
	private String hibernateDialect;

	@Bean
	@Qualifier("jpaDataSource")
	public DataSource getJPADataSource() {
		BasicDataSource ds = new BasicDataSource();
		ds.setDriverClassName(jdbcDriverClassName);
		ds.setUrl(jdbcURL);
		ds.setUsername(jdbcUserName);
		ds.setPassword(jdbcPassword);
		return ds;
	}

	private Properties additionalProperties() {
		Properties properties = new Properties();
		properties.setProperty("hibernate.dialect", hibernateDialect);
		properties.setProperty("hibernate.show_sql", jpaShowSql);
		return properties;
	}
	
	@Bean
	@Primary
	@Qualifier("entityManagerFactory")
	public LocalContainerEntityManagerFactoryBean getEntityManagerFactory() {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(getJPADataSource());
		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		vendorAdapter.setShowSql(Boolean.valueOf(jpaShowSql).booleanValue());
		vendorAdapter.setDatabase(Database.valueOf(jpaDatabase));
		em.setJpaVendorAdapter(vendorAdapter);
		em.setJpaProperties(additionalProperties());
		em.setPersistenceUnitName("st3main");
		em.setPackagesToScan(new String[] { "com.dxc.application.model", "th.co.toyota.st3.api.model" });
		return em;
	}

	@Bean
	public PlatformTransactionManager transactionManager() {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(getEntityManagerFactory().getObject());
		return transactionManager;
	}

	@Bean
	public PersistenceExceptionTranslationPostProcessor jpaExceptionTranslation() {
		return new PersistenceExceptionTranslationPostProcessor();
	}
}

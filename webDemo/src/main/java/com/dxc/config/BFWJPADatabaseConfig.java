package com.dxc.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
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
public class BFWJPADatabaseConfig {
	@Value("${jdbc.driverClassName}")
	private String jdbcDriverClassName;
	@Value("${bfw.jdbc.url}")
	private String jdbcURL;
	@Value("${bfw.jdbc.username}")
	private String jdbcUserName;
	@Value("${bfw.jdbc.password}")
	private String jdbcPassword;
	@Value("${jpa.database}")
	private String jpaDatabase;
	@Value("${jpa.showSql}")
	private String jpaShowSql;
	@Value("${hibernate.dialect}")
	private String hibernateDialect;

	@Bean
	@Qualifier("dataSource_bfw")
	public DataSource getBFWJPADataSource() {
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
	@Qualifier("entityManagerFactory_bfw")
	public LocalContainerEntityManagerFactoryBean getBFWEntityManagerFactory() {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(getBFWJPADataSource());
		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		vendorAdapter.setShowSql(Boolean.valueOf(jpaShowSql).booleanValue());
		vendorAdapter.setDatabase(Database.valueOf(jpaDatabase));
		em.setJpaVendorAdapter(vendorAdapter);
		em.setJpaProperties(additionalProperties());
		em.setPersistenceUnitName("st3main_bfw");
		em.setPackagesToScan(new String[] {"th.co.toyota.st3.api.model" });
		return em;
	}

	@Bean
	@Qualifier("bfw")
	public PlatformTransactionManager transactionManager() {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(getBFWEntityManagerFactory().getObject());
		return transactionManager;
	}
}

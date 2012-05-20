dataSource {
    pooled = true
	autoReconnect = true
	dialect = org.hibernate.dialect.MySQL5InnoDBDialect
}

hibernate {
	cache.use_second_level_cache = false
	cache.use_query_cache = true
	cache.provider_class = 'net.sf.ehcache.hibernate.EhCacheProvider'
}

// environment specific settings
environments {
    development {
        dataSource {
            driverClassName = "com.mysql.jdbc.Driver"
			dbCreate = "update"
			url = "jdbc:mysql://localhost/contagion?useUnicode=yes&characterEncoding=UTF-8&autoReconnect=true"
			username = "root"
			password = "password"
        }
    }
    test {
        dataSource {
            driverClassName = "com.mysql.jdbc.Driver"
			dbCreate = "update"
			url = "jdbc:mysql://localhost/contagion?useUnicode=yes&characterEncoding=UTF-8&autoReconnect=true"
			username = "root"
			password = "password"
        }
    }
    production {
        dataSource {
            driverClassName = "com.mysql.jdbc.Driver"
			dbCreate = "update"
			url = "jdbc:mysql://localhost/contagion?useUnicode=yes&characterEncoding=UTF-8&autoReconnect=true"
			username = "root"
			password = "password"
        }
    }
}

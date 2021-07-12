
# Elasticsearch Documentation 

### Updating the ElasticSeach

The logstash only adds to the index, so if classes are deleted, just make a new index.


### Testing URL

GET:  BASE_URL

***Parameter***

(required) KEY:    q = "ma"

### Exact URL 
 BASE_URL?q=ma

***Example Output List***

Empty Cases: Returns an Empty List

[
    {
        "uniqueID": "yma74",
        "type": "professor",
        "value": "Ma, Yifei",
        "score": 5.12331
    },
    {
        "uniqueID": "xma9",
        "type": "professor",
        "value": "Ma, Xiaoli",
        "score": 5.035672
    },
    {
        "type": "course",
        "value": "MATH 2413",
        "score": 4.730141
    },
    {
        "type": "course",
        "value": "MATH 6457",
        "score": 4.730141
    },
    {
        "type": "course",
        "value": "MATH 6514",
        "score": 4.730141
    },
    {
        "type": "course",
        "value": "MATH 6785",
        "score": 4.730141
    },
    {
        "type": "course",
        "value": "MATH 8900",
        "score": 4.730141
    },
    {
        "type": "course",
        "value": "MATH 7999",
        "score": 4.730141
    },
    {
        "type": "course",
        "value": "MATH 1503",
        "score": 4.730141
    },
    {
        "type": "course",
        "value": "MATH 3670",
        "score": 4.730141
    }
]


# Setup Elasticsearch

## AWS Elasticsearch

Once you get the endpoint to the elasticsearch, you will create index into it. To create an index, you can just use PUT method with the name of the index. We will use https://abc123####!!!.com as the example endpoint. 
***Create Index***
PUT:  https://abc123####!!!.com/index

Body JSON: Raw input in the file ***elasticsearch_settings.json*** 

You can read about each setting configuration in [https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) .

Settings Used in this configuration:

Tokenizer: Edge n-gram (custom)

Filter Type: Word-dellimiter graph


# Setup Logstash 

## Setup Logstash with AWS RDS and AWS Elasticsearch

### Tutorial for EC2 
This uses YUM.  We used APT.
 [https://aws.amazon.com/elasticsearch-service/resources/articles/logstash-tutorial/](https://aws.amazon.com/elasticsearch-service/resources/articles/logstash-tutorial/)

### Test on Local
> "This is for Ubuntu 18.04 Linux." 
> "You will need Java 8"
> "Install Java 8 or Latest Version of Java Depending on the Version of Logstash"

We also need to install ***JDBC MySQL*** for the integration with RDS. 
You'll need the JAR file location after you download it. You probably can download to which ever folder you want or you see reasonable. Save the JAR file location for the configuration file.

[https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)
You will need to download the Platform Independent version to get the JAR file.

Logstash Download Guide is here: https://www.elastic.co/guide/en/logstash/current/installing-logstash.html
 
Get the Public Key for Logstash
>wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -

You may need to install the `apt-transport-https` package on Debian before proceeding:
>sudo apt-get install apt-transport-https

Run `sudo apt-get update` and the repository is ready for use. You can install it with:
>sudo apt-get update && sudo apt-get install logstash

Before you start, you need to make two changes to the current user’s environment. First, you need to add your current user to the **logstash** group so it can write to the application’s directories for caching messages. The **usermod** command will do this for you.  
>>[user]$ sudo usermod -a -G logstash user

I had to add these two commands to add logstash and read write logs permission

> sudo chown -R logstash.logstash /usr/share/logstash

> sudo chmod 777 /usr/share/logstash/data

I have to add these commands on another computer to make it work unless the above doesn't make it work, sometimes Group error so just ignore that command:

> LS_USER = "logstash"

> LS_GROUP = "logstash"

Then, go to the user$ ***etc/logstash/conf.d*** and make a configuration file.

Configuration file will be in the local etc/logstash/conf.d

>[user]$ cd /etc/logstash/conf.d

You can create whatever the name of the file has to be. We created settings.conf
You can used and editor like VS Code or Atom to Save settings.conf to ***etc/logstash/conf.d*** folder.
Sometimes you'll have to use vim or vi to create the file on the command line.

Current logstash settings is in ***settings.conf***.

### Before you run the logstash file:

You need to download the AWS Elastichsearch Plugin while in the ***/usr/share/logstash folder*** :

>sudo -E bin/logstash-plugin install logstash-output-amazon_es

To run the logstash configuration file ***settings.conf*** on the command line within the ***/usr/share/logstash*** directory:
>[user]$ cd /usr/share/logstash

> bin/logstash -f /etc/logstash/conf.d/settings.conf

Sometimes it says something about require to find where the logstash file is with --path.settings. The command then would be 
> sudo bin/logstash --path.settings /etc/logstash -f /etc/logstash/conf.d/settings.conf

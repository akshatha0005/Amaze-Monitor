package ec2monitor;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.cloudwatch.AmazonCloudWatchClient;
import com.amazonaws.services.cloudwatch.model.Datapoint;
import com.amazonaws.services.cloudwatch.model.Dimension;
import com.amazonaws.services.cloudwatch.model.GetMetricStatisticsRequest;
import com.amazonaws.services.cloudwatch.model.GetMetricStatisticsResult;

public class AmazonCloudWatchFetchCpuUtilTest {

    public static void main(String[] args) {
        final String awsAccessKey = "accessKey";
        final String awsSecretKey = "secrect access key";
        List<String> items = Collections.unmodifiableList(Arrays.asList("i-6070edb9","i-4d821d94","i-06811edf"));
        List<String> metricOption = Collections.unmodifiableList(Arrays.asList("CPUUtilization","NetworkIn","NetworkOut","DiskReadBytes","DiskReadOps","DiskWriteOps","DiskWriteBytes"));
        
        final AmazonCloudWatchClient client = client(awsAccessKey, awsSecretKey);
        for (String temp : items) {
        	for(String options : metricOption)
        	{
	            final GetMetricStatisticsRequest request = request(temp,options); 
	            final GetMetricStatisticsResult result = result(client, request);
	            toStdOut(result, temp, options);
        	}
        }
    }

    static AmazonCloudWatchClient client(final String awsAccessKey, final String awsSecretKey) {
        final AmazonCloudWatchClient client = new AmazonCloudWatchClient(new BasicAWSCredentials(awsAccessKey, awsSecretKey));
        client.setEndpoint("http://monitoring.us-west-2.amazonaws.com/");
        return client;
    }

   static GetMetricStatisticsRequest request(final String instanceId,final String metricOption) {
        final long timePeriod = 1000 * 60 * 60 *1;
        final int oneHour = 60*60;
        return new GetMetricStatisticsRequest()
            .withStartTime(new Date(new Date().getTime()- timePeriod))
            .withNamespace("AWS/EC2")
            .withPeriod(oneHour)
            .withDimensions(new Dimension().withName("InstanceId").withValue(instanceId))
            .withMetricName(metricOption)
            .withStatistics("Average")
            .withEndTime(new Date());
    }
    
    
    static GetMetricStatisticsResult result(
            final AmazonCloudWatchClient client, final GetMetricStatisticsRequest request) {
         return client.getMetricStatistics(request);
    }

    public static void toStdOut(final GetMetricStatisticsResult result, final String instanceId,final String metricOption) {
        for (final Datapoint dataPoint : result.getDatapoints()) {
            DateFormat timeStampvalue = new SimpleDateFormat("dd/MM/yy HH:mm:ss");
        	Calendar calobj = Calendar.getInstance();
        	String timeStamp=timeStampvalue.format(calobj.getTime()); 
        	DatabaseConnection.insertData(instanceId,metricOption,dataPoint.getAverage());
            //System.out.printf("%s %s : %s %s %n", instanceId,metricOption, dataPoint.getAverage(),timeStamp,dataPoint);
            //System.out.printf("***TimeStamp***", instanceId,metricOption, dataPoint.getAverage(),timeStamp,dataPoint);
        }
    }
}

package ec2monitor;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Date;
 

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.cloudwatch.AmazonCloudWatchClient;
import com.amazonaws.services.cloudwatch.model.Datapoint;
import com.amazonaws.services.cloudwatch.model.Dimension;
import com.amazonaws.services.cloudwatch.model.GetMetricStatisticsRequest;
import com.amazonaws.services.cloudwatch.model.GetMetricStatisticsResult;

public class AmazonCloudWatchFetchMemoryUtilTest {
	public static void main(String[] args) {
	       final String awsAccessKey = "accesskey";
	       final String awsSecretKey = "secretAccessKey";
	       List<String> items = Collections.unmodifiableList(Arrays.asList("i-6070edb9","i-4d821d94","i-06811edf"));
	       List<String> metricOption = Collections.unmodifiableList(Arrays.asList("MemoryUtilization","MemoryAvailable","MemoryUsed"));
	      
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
	   private static AmazonCloudWatchClient client(final String awsAccessKey, final String awsSecretKey) {
	       final AmazonCloudWatchClient client = new AmazonCloudWatchClient(new BasicAWSCredentials(awsAccessKey, awsSecretKey));
	       client.setEndpoint("http://monitoring.us-west-2.amazonaws.com/");
	       return client;
	   }
	   private static GetMetricStatisticsRequest request(final String instanceId,final String metricOption) {
	      final long timePeriod = 1000 * 60 * 60 *1;
	       final int oneHour = 60*60*12;
	       return new GetMetricStatisticsRequest()
	           .withStartTime(new Date(new Date().getTime()- timePeriod))
	           .withNamespace("System/Linux")
	           .withPeriod(oneHour)
	           .withDimensions(new Dimension().withName("InstanceId").withValue(instanceId))
	           .withMetricName(metricOption)
	           .withStatistics("Average")
	           .withEndTime(new Date());
	   }
	   private static GetMetricStatisticsResult result(
	           final AmazonCloudWatchClient client, final GetMetricStatisticsRequest request) {
	        return client.getMetricStatistics(request);
	   }
	 
	   private static void toStdOut(final GetMetricStatisticsResult result, final String instanceId,final String metricOption) {
	       //System.out.println("Results"+result); // outputs empty result: {Label: CPUUtilization,Datapoints: []}
		   //System.out.println("size: " + result.getDatapoints().size());
	       for (final Datapoint dataPoint : result.getDatapoints()) {
	    	   DatabaseConnection.insertData(instanceId,metricOption,dataPoint.getAverage());
	          //System.out.printf("%s instance's average CPU utilization : %s%n", instanceId, dataPoint.getAverage());     
	          //System.out.printf("%s instance's %s : %s%n", instanceId,metricOption, dataPoint.getAverage());
	       }
	   }
}

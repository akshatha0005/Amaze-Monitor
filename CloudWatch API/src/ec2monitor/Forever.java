package ec2monitor;

public class Forever {
    public static void main(String[] args) throws InterruptedException {
        while (true) { 
        	AmazonCloudWatchFetchCpuUtilTest.main(args);
        	AmazonCloudWatchFetchMemoryUtilTest.main(args);
        	Thread.sleep(60000);
        }
    }
}
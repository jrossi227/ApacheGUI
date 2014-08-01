package ca.apachegui.history;
import ca.apachegui.db.LogData;

/**
 * Thread used to commit log data
 * @author jonathan
 *
 */
public class InsertHistory implements Runnable 
{
	private LogData data[];
	
	public InsertHistory(LogData logData[])
	{
		this.data=logData;
	}
	
	@Override
	public void run() 
	{
		LogData.commitLogData(data);
	}

}

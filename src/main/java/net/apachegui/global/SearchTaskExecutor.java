package net.apachegui.global;

import net.apachegui.global.SearchTask.State;

import org.springframework.core.task.TaskExecutor;

public class SearchTaskExecutor {

    private TaskExecutor taskExecutor;

    public SearchTaskExecutor(TaskExecutor taskExecutor) {
        this.taskExecutor = taskExecutor;
    }

    public boolean start(String directory, String fileList, String filter, boolean recursive) {

        if (SearchTask.getCurrentState() == State.IDLE || SearchTask.getCurrentState() == State.CANCELLED) {

            SearchTask thread = new SearchTask(directory, fileList, filter, recursive);
            this.taskExecutor.execute(thread);

            return true;
        }

        return false;
    }

    public void cancel() throws InterruptedException {
        SearchTask.cancel();
    }
}

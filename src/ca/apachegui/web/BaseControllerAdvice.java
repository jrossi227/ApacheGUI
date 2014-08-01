package ca.apachegui.web;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ControllerAdvice
public class BaseControllerAdvice {

	private static Logger log = Logger.getLogger(BaseControllerAdvice.class);
	
	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@RequestMapping(produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String handleError(HttpServletResponse response, Exception exception) {	
		log.error(exception.getMessage(), exception);
				
		JSONObject resultJSON = new JSONObject();
		resultJSON.put("message", exception.getMessage());
				
		return resultJSON.toString();
	}
	
}

package com.ikeda.kakeibo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.ikeda.kakeibo.dto.request.IncomeExpenseRequest;
import com.ikeda.kakeibo.dto.response.IncomeExpenseDto;
import com.ikeda.kakeibo.service.IncomeExpenseService;

@RestController
@RequestMapping("/api/income-expenses")
public class IncomeExpenseController {
	
	private final IncomeExpenseService service;
	
	public IncomeExpenseController(IncomeExpenseService service) {
		this.service = service;
	}
	
	@GetMapping
	public List<IncomeExpenseDto> list(){
		return service.getAllRecords();
	}
	
	@GetMapping("/{id}")
	public IncomeExpenseDto getRecordById(@PathVariable("id") int id) {
		return service.getRecordById(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public IncomeExpenseDto insert(@RequestBody IncomeExpenseRequest request) {
		return service.insert(request);
	}
	
	@PutMapping("/{id}")
	public IncomeExpenseDto update(@PathVariable("id") int id, @RequestBody IncomeExpenseRequest request) {
		return service.update(id, request);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") int id) {
		service.delete(id);
	}
}

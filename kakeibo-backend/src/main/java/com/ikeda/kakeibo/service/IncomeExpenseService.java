package com.ikeda.kakeibo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ikeda.kakeibo.dto.request.IncomeExpenseRequest;
import com.ikeda.kakeibo.dto.response.IncomeExpenseDto;
import com.ikeda.kakeibo.entity.IncomeExpense;
import com.ikeda.kakeibo.repository.IncomeExpenseRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class IncomeExpenseService {
	
	private final IncomeExpenseRepository repository;
	
	public IncomeExpenseService(IncomeExpenseRepository repository) {
		this.repository = repository;
	}
	
	/**
	 * 収支の全件検索
	 * @return　List<IncomeExpenseDto> 収支のレコード　全件
	 */
	public List<IncomeExpenseDto> getAllRecords(){
		return repository.findAll().stream()
				.map(IncomeExpenseDto::new)
		        .toList();
	}
	
	/**
	 * 収支のID検索
	 * @param id 検索するID
	 * @return ImcomeExpenseDto 収支のレコード　1件
	 */
	public IncomeExpenseDto getRecordById(int id) {
		return repository.findById(id).map(IncomeExpenseDto::new)
				.orElseThrow(() -> new EntityNotFoundException("Target income-expense record was not found : id=" + id));
	}
	
	/**
	 * 収支の登録
	 * @param request
	 * @return
	 */
	public IncomeExpenseDto insert(IncomeExpenseRequest request) {
		IncomeExpense entity = new IncomeExpense();
		setColumnValues(request, entity);
		IncomeExpense saved = repository.save(entity);
		return new IncomeExpenseDto(saved);
	}
	
	/**
	 * 収支の更新
	 * @param id
	 * @param request
	 * @return
	 */
	public IncomeExpenseDto update(int id, IncomeExpenseRequest request) {
		IncomeExpense targetObj = repository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Target income-expense record was not found : id=" + id));
		setColumnValues(request, targetObj);
		IncomeExpense updated = repository.save(targetObj);
		return new IncomeExpenseDto(updated);
	}
	
	/**
	 * 収支の削除
	 * @param id
	 */
	public void delete(int id) {
		IncomeExpense targetObj = repository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Target income-expense record was not found : id=" + id));
		repository.delete(targetObj);
	}
	
	/**
	 * 各カラムの値をセットする。
	 * @param request
	 * @param entity
	 */
	private void setColumnValues(IncomeExpenseRequest request, IncomeExpense entity) {
		entity.setTypeId(request.getTypeId()); //収支
		entity.setPrice(request.getPrice()); //金額
		entity.setCategoryId(request.getCategoryId()); //カテゴリー
		entity.setMemo(request.getMemo()); //メモ
		
		// 最終更新日は都度値を取得してセット
		LocalDateTime now = LocalDateTime.now();
		entity.setLastUpdateAt(now);
		
		//　計上日
		LocalDate accountingDate = request.getAccountingDate();
		entity.setAccountingDate(accountingDate);
		
		//　引き落とし日
		LocalDate settlementDate = request.getSettlementDate();
		// 引き落とし日の入力がない場合には計上日を補完する
		if(settlementDate == null) {
			entity.setSettlementDate(accountingDate);
		} else {
			entity.setSettlementDate(settlementDate);
		}
	}
}

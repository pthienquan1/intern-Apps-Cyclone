package com.example.demo.repository;

import com.example.demo.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by quan0
 * Date 7/29/2023 - 4:56 PM
 * Description: ...
 */
public interface IAccountRepository extends JpaRepository<Account,Short> {
    public Account findByUserName(String name);
    Account findById(long id);
}

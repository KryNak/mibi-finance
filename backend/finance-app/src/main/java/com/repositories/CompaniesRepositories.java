package com.repositories;

import com.models.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompaniesRepositories extends CrudRepository<Company, Long> {
}

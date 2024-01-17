package com.devminds.rentify.service;

import com.devminds.rentify.entity.Category;
import com.devminds.rentify.exception.CategoryNotFoundException;
import com.devminds.rentify.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private static final String CATEGORY_NOT_FOUND_MESSAGE = "Category with %f id not found.";
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(int id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(String.format(CATEGORY_NOT_FOUND_MESSAGE, id)));
    }
}

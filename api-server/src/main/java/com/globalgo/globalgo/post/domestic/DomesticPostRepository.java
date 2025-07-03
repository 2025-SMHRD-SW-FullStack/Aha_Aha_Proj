package com.globalgo.globalgo.post.domestic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DomesticPostRepository extends JpaRepository<DomesticPost, Long> {
    List<DomesticPost> findByUserId(Long userId);
}
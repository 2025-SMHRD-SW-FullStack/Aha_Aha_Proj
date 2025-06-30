package com.globalgo.globalgo.slidebot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlidebotLogRepository extends JpaRepository<SlidebotLog, Long> {
}


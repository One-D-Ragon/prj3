package com.backend.reservation.service.impl;

import com.backend.reservation.domain.Reservation;
import com.backend.reservation.domain.status.ReservationStatus;
import com.backend.reservation.mapper.ReservationMapper;
import com.backend.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.spi.RegisterableService;
import javax.imageio.spi.ServiceRegistry;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
@Log4j2
public class ReservationServiceImpl implements ReservationService {
    private final ReservationMapper reservationMapper;


    @Override
    public void delete(Integer reservationId) {
        reservationMapper.deleteByReservationId(reservationId);
    }

    @Override
    public void update(Reservation reservation) {
        reservationMapper.update(reservation);
    }

    @Override
    public void insert(Reservation reservation) {
        reservation.setStatus(ReservationStatus.ACCEPT);
        reservationMapper.insert(reservation);
    }

    @Override
    public List<Reservation> list() {
        return reservationMapper.selectAll();
    }

    @Override
    public Reservation view(Integer reservationId) {
        return reservationMapper.selectByReservationId(reservationId);
    }
}
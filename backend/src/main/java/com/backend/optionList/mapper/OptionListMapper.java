package com.backend.optionList.mapper;

import com.backend.optionList.domain.OptionList;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface OptionListMapper {

    @Insert("""
            INSERT INTO OPTION_LIST (name) VALUES (#{name})
            """)
    int insertOptionList(OptionList optionList);


    @Select("""
            SELECT *
            FROM OPTION_LIST
            ORDER BY OPTION_LIST_ID DESC 
            """)
    List<OptionList> selectAll();

    @Delete("""
            DELETE FROM OPTION_LIST
            WHERE OPTION_LIST_ID = #{optionListId}
            """)
    int deleteByOptionId(int optionListId);

    @Update("""
            UPDATE OPTION_LIST
            SET IS_ACTIVE = #{isActive}
            WHERE OPTION_LIST_ID = #{optionListId}
            """)
    int update(OptionList optionList);
}

create  proc getPartnerData(@p_id as decimal)
as 
begin 
	select * from p_partner where p_id = @p_id
end


exec getPartnerData 21789

create proc updatePartner(
@p_id as decimal,
@p_state as NVarchar(50))
as 
begin
	update p_partner set p_state=@p_state where p_id=@p_id
end

exec updatePartner 21789, newState


 select * from p_partner where p_id in (select MAX(p_id) from p_partner);


 
create proc createPartner
	@p_name NVarChar(255),					@p_dba NVarChar(255),
	@p_alias NVarChar(255),					@p_type NVarChar(255),
    @p_relationship NVarChar(255),			@p_address1 NVarChar(255),
    @p_address2 NVarChar(255),				@p_address3 NVarChar(255),
    @p_city NVarChar(255),				    @p_state NVarChar(255),
    @p_postal_code NVarChar(255),		    @p_country NVarChar(255),
    @p_website NVarChar(255),			    @p_phone NVarChar(255),
    @p_fax NVarChar(255),				    @p_toll_free NVarChar(255),
    @p_internal_sales_rep int,			    @p_supp_terms NVarChar(255),
    @p_terms NVarChar(255),				    @p_status NVarChar(255),
    @p_comments NVarChar(255),			    @p_ship NVarChar(255),
    @p_es_cust_id NVarChar(255),		    @p_ac_batch_flag_c int,
    @p_ac_batch_flag_s int,				    @p_ac_batch_id int,
    @p_es_supp_id NVarChar(255),		    @p_site_id int,
    @p_customer_status int,					@p_supplier_status int,
    @temp_p_id char(36),				    @p_vendor_status int,
    @p_group_id int
as 
begin 
insert into p_partner (
                            p_name,                            p_dba,
                            p_alias,                           p_type,
                            p_relationship,                    p_address1,
                            p_address2,                        p_address3,
                            p_city,                            p_state,
                            p_postal_code,                     p_country,
                            p_website,                         p_phone,
                            p_fax,                             p_toll_free,
                            p_internal_sales_rep,              p_supp_terms,
                            p_terms,                           p_status,
                            p_comments,                        p_ship,
                            p_es_cust_id,                      p_ac_batch_flag_c,
                            p_ac_batch_flag_s,                 p_ac_batch_id,
                            p_es_supp_id,                      p_site_id,
                            p_customer_status,				   p_supplier_status,
                            temp_p_id,                         p_vendor_status,
                            p_group_id                        )
                        values(
                            @p_name,                          @p_dba,
                            @p_alias,						  @p_type,
                            @p_relationship,                  @p_address1,
                            @p_address2,                      @p_address3,
                            @p_city,                          @p_state,
                            @p_postal_code,                   @p_country,
                            @p_website,                       @p_phone,
                            @p_fax,                           @p_toll_free,
                            @p_internal_sales_rep,            @p_supp_terms,
                            @p_terms,                         @p_status,
                            @p_comments,					  @p_ship,
                            @p_es_cust_id,					  @p_ac_batch_flag_c,
                            @p_ac_batch_flag_s,               @p_ac_batch_id,
                            @p_es_supp_id,					  @p_site_id,
                            @p_customer_status,		          @p_supplier_status,
                            @temp_p_id,                       @p_vendor_status,
                            @p_group_id);
     select * from p_partner where p_id in (select MAX(p_id) from p_partner);
end;



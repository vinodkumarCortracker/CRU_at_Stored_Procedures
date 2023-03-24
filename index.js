const express = require('express')
const sql = require('mssql')
const bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = 5000

var config = {
    user: 'sa',
    password: 'Test@123',
    server: '10.38.0.105',
    port: 1434,
    options: {
        trustedconnection: true,
        enableArithAort: true,
        instancename: 'WIN-RVBJS380SPR\MSSQLSERVER1',
        trustServerCertificate: true
    },
    database: 'InternTest'
}

// To create a partner 
app.post('/create_partner', async (req, res) => {
    try {
        let data = req.body

        let pool = await sql.connect(config)
        pool.request()
            .input('p_name', sql.NVarChar, data.p_name)
            .input('p_dba', sql.NVarChar, data.p_pda)
            .input('p_alias', sql.NVarChar, data.p_alias)
            .input('p_type', sql.NVarChar, data.p_type)
            .input('p_relationship', sql.NVarChar, data.p_relationship)
            .input('p_address1', sql.NVarChar, data.p_address1)
            .input('p_address2', sql.NVarChar, data.p_address2)
            .input('p_address3', sql.NVarChar, data.p_address3)
            .input('p_city', sql.NVarChar, data.p_city)
            .input('p_state', sql.NVarChar, data.p_state)
            .input('p_postal_code', sql.NVarChar, data.p_postal_code)
            .input('p_country', sql.NVarChar, data.p_country)
            .input('p_website', sql.NVarChar, data.p_website)
            .input('p_phone', sql.NVarChar, data.p_phone)
            .input('p_fax', sql.NVarChar, data.p_fax)
            .input('p_toll_free', sql.NVarChar, data.p_toll_free)
            .input('p_internal_sales_rep', sql.Int, data.p_internal_sales_rep)
            .input('p_supp_terms', sql.NVarChar, data.p_supp_terms)
            .input('p_terms', sql.NVarChar, data.p_terms)
            .input('p_status', sql.NVarChar, data.p_status)
            .input('p_comments', sql.NVarChar, data.p_comments)
            .input('p_ship', sql.NVarChar, data.p_ship)
            .input('p_es_cust_id', sql.NVarChar, data.p_es_cust_id)
            .input('p_ac_batch_flag_c', sql.Int, data.p_ac_batch_flag_c)
            .input('p_ac_batch_flag_s', sql.Int, data.p_ac_batch_flag_s)
            .input('p_ac_batch_id', sql.Int, data.p_ac_batch_id)
            .input('p_es_supp_id', sql.NVarChar, data.p_es_supp_id)
            .input('p_site_id', sql.Int, data.p_site_id)
            .input('p_customer_status', sql.Int, data.p_customer_status)
            .input('p_supplier_status', sql.Int, data.p_supplier_status)
            .input('temp_p_id', sql.Char, data.temp_p_id)
            .input('p_vendor_status', sql.Int, data.p_vendor_status)
            .input('p_group_id', sql.Int, data.p_group_id)
            .execute('createPartner', (err, results) => {
                if (err)
                    res.send(err.message)
                res.send(results.recordsets[0])
            })
    } catch (err) { res.send(err.message) }

})

// To get the partner details
app.post('/get_partner/:id', async (req, res) => {
    try {
        let row_id = req.params.id
        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('p_id', sql.Int, row_id)
            .execute('getPartnerData ')
        let partner = result.recordsets
        res.send(partner)

    } catch (err) { res.send(err.message) }
})

// to update the partner details
app.post('/update_partner/:id', async (req, res) => {
    try {
        let p_id = req.params.id
        let update = req.body

        let pool = await sql.connect(config)
        await pool.request()
            .input('p_id', sql.Int, p_id)
            .input('p_state', sql.NVarChar(50), update.p_state)
            .execute('updatePartner', (err, results) => {
                if (err) { res.send(err.message) }
                else res.send(results.recordsets)
            })
    } catch (err) { res.send(err.message) }
})

app.listen(port, () => {
    console.log('Server running on the port# 5000')
})
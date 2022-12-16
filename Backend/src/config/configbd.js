const oracledb = require('oracledb');

cns = {
    user: "usr_panaderia",
    password: "PassPan",
    connectString: "localhost/xepdb1"
}


async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;
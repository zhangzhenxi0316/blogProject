const express = require("express");
const article = express.Router();
// 生成随机ID
const uuid = require("node-uuid");
// const connection = require('../../util/mysql')
const { query } = require("../../util/select");

// 添加文章
article.post("/insert", async (req, res) => {
  console.log(req.body);

  try {
    const uid = uuid.v1();
    const title = req.body.title;
    const description = req.body.description;
    const content = req.body.content;
    const category = req.body.category;
    const tags = req.body.tags;
    const date = new Date().getTime();
    console.log(date);
    // console.log(req.body);
    const taglist = tags.split(",");
    let sql1 = `insert into article( uid,title,content,date,description) values(?,?,?,?,?)`;
    let arr1 = [uid, title, content, date, description];
    await query(sql1, arr1, "article success");
    let sql2 = `insert into article_cate( article_id,category) values(?,?)`;
    let arr2 = [uid, category];
    await query(sql2, arr2, "cate success");
    let sql3 = `insert into article_tag(article_id,tag) values(?,?)`;
    for (let i = 0; i < taglist.length; i++) {
      let arr3 = [uid, taglist[i]];
      await query(sql3, arr3, "tag success");
    }
    // console.log('ok');
  } catch (error) {
    console.log(error);
    res.send("fail");
    return;
  }
  res.send("success");
});
// 查询全部文章和分类
article.get("/get_All", async (req, res) => {
  let sql = `select * from article_cate_view order by date desc`;
  query(sql)
    .then((result) => {
      res.json({
        msg: "success",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);

      res.json({
        msg: "fail",
        data: {},
      });
    });
});
// 通过id查找标签
article.get("/get_article", async (req, res) => {
  let article = {};
  try {
    const uid = req.query.id;
    let sql = `select tag from article_tag where article_id=?`;
    let sql2 = `select * from article_cate_view where uid=?`;
    let result = await query(sql2, [uid]);
    article = result[0];
    let tagResult = await query(sql, [uid]);
    const tags = [];
    for (let i = 0; i < tagResult.length; i++) {
      tags.push(tagResult[i].tag);
    }
    article.tags = tags;
  } catch (error) {
    console.log(error);
    res.json({
      data: {},
      msg: "fail",
    });
    return;
  }
  res.json({
    data: article,
    msg: "success",
  });
});
// 分类
article.get("/get_cate", async (req, res) => {
  let sql = `select distinct category from article_cate`;
  let cates = await query(sql);
  try {
    let sql2 = `select uid,title from article_cate_view where category=?`;
    // const data = []

    for (let i = 0; i < cates.length; i++) {
      let category = cates[i].category;
      let list = await query(sql2, [category]);
      cates[i].list = list;
    }
  } catch (error) {
    res.json({
      data: {},
      msg: "fail",
    });
    return;
  }
  res.json({
    data: cates,
    msg: "success",
  });
});
// 标签
article.get("/get_tag", async (req, res) => {
  let sql = `select distinct tag from article_tag`;
  let tags = await query(sql);
  try {
    let sql2 = `select uid,title from article_tag_view where tag=?`;

    for (let i = 0; i < tags.length; i++) {
      let tag = tags[i].tag;
      let list = await query(sql2, [tag]);
      tags[i].list = list;
    }
  } catch (error) {
    res.json({
      data: {},
      msg: "fail",
    });
    return;
  }
  res.json({
    data: tags,
    msg: "success",
  });
});
// 时间
article.get("/get_time", async (req, res) => {
  let sql = `select uid,title,date from article_cate_view order by date desc`;
  query(sql)
    .then((result) => {
      res.json({
        msg: "success",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);

      res.json({
        msg: "fail",
        data: {},
      });
    });
});
//   删除
article.get("/delete", async (req, res) => {
  let uid = req.query.id;
  let sql = `delete from article where uid = ? `;
  query(sql, [uid])
    .then((result) => {
      res.send({
        data: {},
        msg: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        data: {},
        msg: "fail",
      });
    });
});
// 搜索功能
article.get("/search", async (req, res) => {
  let msg = req.query.msg;
  let sql = `select uid,title,content from article where content like '%${msg}%'`;
  query(sql)
    .then((result) => {
      res.json({
        data: result,
        msg: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        data: {},
        msg: "fail",
      });
    });
});
// 修改
article.post("/alter", async (req, res) => {
  try {
    let uid = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const content = req.body.content;
    const category = req.body.category;
    const tags = req.body.tags;
    const taglist = tags.split(",");
    let sql = `update  article set title=? ,description=? ,content=?  where uid=?`;
    let arr = [title, description, content, uid];
    await query(sql, arr);
    // console.log(123);

    let sql2 = `delete from article_tag where article_id = ?`;
    await query(sql2, [uid]);

    let sql3 = `insert into article_tag(article_id,tag) values(?,?)`;
    for (let i = 0; i < taglist.length; i++) {
      let arr3 = [uid, taglist[i]];
      await query(sql3, arr3, "tag success");
    }
    let sql4 = `update article_cate set category = ? where article_id=?`;
    await query(sql4, [category, uid]);
  } catch (error) {
    console.log(error);

    res.json({
      data: {},
      msg: "fail",
    });
    return;
  }
  res.json({
    data: {},
    msg: "success",
  });
});
module.exports = article;

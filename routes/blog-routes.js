import express from "express";
import { getAllBlogs, addBlog, updateBlog, getByID, deleteBlog, getByUser } from "../controllers/blog-controller";

const blogRouter = express.Router();
blogRouter.get("/", getAllBlogs);
blogRouter.post("/addBlog", addBlog);
blogRouter.post("/update/:id", updateBlog);
blogRouter.get("/:id", getByID);
blogRouter.delete("/delete/:id", deleteBlog);
blogRouter.get("/user/:id", getByUser);

export default blogRouter;
/*

https://website-api.omni.fairprice.com.sg/api/product/v2?algopers=prm-ppb-0,prm-ep-0&category=rice,-noodles--cooking-ingredients-5&includeTagDetails=true&metaData=[object Object]&orderType=DELIVERY&page=3&pageType=category&slug=rice,-noodles--cooking-ingredients-5&storeId=165&url=rice,-noodles--cooking-ingredients-5

algopers: prm-ppb-0,prm-ep-0
category: rice,-noodles--cooking-ingredients-5
experiments: searchVariant-B,timerVariant-Z,inlineBanner-A,substitutionBSVariant-B,gv-A,shelflife-B,ds-A,ls_comsl-B,ls_deltime-ogA,ls_deltime-feA,algolia-tag,fbt-a,algolia-cat,cartoos-a,cartfiller-a,catnav-hide,algolia-product,algolia-promo,catbubog-B,algolia-brand,sbanner-A,count-a,cam-b,priceperpiece-b,ls_deltime-sortA,promobanner-a,algopers-a
includeTagDetails: true
metaData: [object Object]
orderType: DELIVERY
page: 2
pageType: category
slug: rice,-noodles--cooking-ingredients-5
storeId: 165
url: rice,-noodles--cooking-ingredients-5

https://website-api.omni.fairprice.com.sg/api/product/v2?algopers=prm-ppb-0,prm-ep-0&category=rice,-noodles--cooking-ingredients-5&experiments=searchVariant-B,timerVariant-Z,inlineBanner-A,substitutionBSVariant-B,gv-A,shelflife-B,ds-A,ls_comsl-B,ls_deltime-ogA,ls_deltime-feA,algolia-tag,fbt-a,algolia-cat,cartoos-a,cartfiller-a,catnav-hide,algolia-product,algolia-promo,catbubog-B,algolia-brand,sbanner-A,count-a,cam-b,priceperpiece-b,ls_deltime-sortA,promobanner-a,algopers-a&includeTagDetails=true&metaData=[object Object]&orderType=DELIVERY&page=3&pageType=category&slug=rice,-noodles--cooking-ingredients-5&storeId=165&url=rice,-noodles--cooking-ingredients-5

*/
/*
 * package com.project.festival.Controller.orther;
 * 
 * import java.util.ArrayList; import java.util.List;
 * 
 * import org.springframework.stereotype.Component;
 * 
 * import com.project.festival.Entity.board.FileDetail; import
 * com.project.festival.Entity.board.Entity.BoardFree; import
 * com.project.festival.Entity.board.File.FileEvent; import
 * com.project.festival.Entity.board.File.FileFree; import
 * com.project.festival.Entity.board.File.FileNotic; import
 * com.project.festival.Entity.board.File.FilePromotion; import
 * com.project.festival.Entity.board.File.FileQA;
 * 
 * @Component public class ConversionFile {
 * 
 * // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * 
 * public List<FileDetail> returnFree(List<FileFree> f) {
 * 
 * List<FileDetail> detailList = new ArrayList<>();
 * 
 * for(FileFree fFree : f) { FileDetail fDetail = new FileDetail();
 * 
 * fDetail.setFileNum(fFree.getFileNum());
 * fDetail.setBoardNum(fFree.getBoardFree().getBoardNum());
 * fDetail.setName(fFree.getFName()); fDetail.setUrl(fFree.getUrl());
 * 
 * detailList.add(fDetail); }
 * 
 * return detailList; }
 * 
 * public List<FileFree> intoFree(List<FileDetail> d, BoardFree bf) {
 * 
 * List<FileFree> freeList = new ArrayList<>();
 * 
 * for(FileDetail detail : d) { FileFree fFree = new FileFree();
 * 
 * fFree.setBoardFree(bf); fFree.setFName(detail.getName());
 * fFree.setUrl(detail.getUrl());
 * 
 * freeList.add(fFree);
 * 
 * }
 * 
 * return freeList; }
 * 
 * // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * 
 * public List<FileDetail> returnNotic(List<FileNotic> f) {
 * 
 * List<FileDetail> detailList = new ArrayList<>();
 * 
 * for(FileNotic fNotic : f) { FileDetail fDetail = new FileDetail();
 * 
 * fDetail.setFileNum(fNotic.getFileNum());
 * fDetail.setBoardNum(fNotic.getBoardNotic().getBoardNum());
 * fDetail.setName(fNotic.getFName()); fDetail.setUrl(fNotic.getUrl());
 * 
 * detailList.add(fDetail); }
 * 
 * return detailList; }
 * 
 * // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * 
 * public List<FileDetail> returnPromotion(List<FilePromotion> f) {
 * 
 * List<FileDetail> detailList = new ArrayList<>();
 * 
 * for(FilePromotion fPromotion : f) { FileDetail fDetail = new FileDetail();
 * 
 * fDetail.setFileNum(fPromotion.getFileNum());
 * fDetail.setBoardNum(fPromotion.getBoardPromotion().getBoardNum());
 * fDetail.setName(fPromotion.getFName()); fDetail.setUrl(fPromotion.getUrl());
 * 
 * detailList.add(fDetail); }
 * 
 * return detailList; }
 * 
 * // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * 
 * public List<FileDetail> returnEvent(List<FileEvent> f) {
 * 
 * List<FileDetail> detailList = new ArrayList<>();
 * 
 * for(FileEvent fEvent : f) { FileDetail fDetail = new FileDetail();
 * 
 * fDetail.setFileNum(fEvent.getFileNum());
 * fDetail.setBoardNum(fEvent.getBoardEvent().getBoardNum());
 * fDetail.setName(fEvent.getFName()); fDetail.setUrl(fEvent.getUrl());
 * 
 * detailList.add(fDetail); }
 * 
 * return detailList; }
 * 
 * // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 * 
 * public List<FileDetail> returnQA(List<FileQA> f) {
 * 
 * List<FileDetail> detailList = new ArrayList<>();
 * 
 * for(FileQA fQA : f) { FileDetail fDetail = new FileDetail();
 * 
 * fDetail.setFileNum(fQA.getFileNum());
 * fDetail.setBoardNum(fQA.getBoardQA().getBoardNum());
 * fDetail.setName(fQA.getFName()); fDetail.setUrl(fQA.getUrl());
 * 
 * detailList.add(fDetail); }
 * 
 * return detailList; }
 * 
 * }
 */
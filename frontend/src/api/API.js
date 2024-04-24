import {
    axiosInstance, axiosGet, axiosPost, axiosPut, axiosDelete, axiosPatch,
} from "./AxiosHelper";

async function getAuthorById(authorId) {
    return await axiosGet(`/author/${authorId}`);
}

async function getAuthorByName(authorName) {
    return await axiosGet(`/author`, { authorName });
}

async function getNameAndAliasByAuthorId(authorId) {
    return await axiosGet(`/authorNames/${authorId}`);
}


async function getTopAuthots(topN, criterion) {
    return await axiosGet(`/topAuthors`, { topN, criterion });
}

async function getAuthorFields(authorId) {
    return await axiosGet(`/authorFields/${authorId}`);
}

async function getAuthorCollaborators(authorId) {
    return await axiosGet(`/authorCollaborators/${authorId}`);
}

async function getAuthorPapers(authorId) {
    return await axiosGet(`/authorPapers/${authorId}`);
}

async function getPaperbyId(paperId) {
    return await axiosGet(`/paper/${paperId}`);
}

async function getPaperbyTitle(title) {
    return await axiosGet(`/papers`, { title });
}

async function getPaperFields(paperId) {
    return await axiosGet(`/paperFields/${paperId}`);
}

async function getPaperAuthors(paperId) {
    return await axiosGet(`/paperAuthors/${paperId}`);
}

async function getPaperExternalIds(paperId) {
    return await axiosGet(`/paperExternalIds/${paperId}`);
}

async function getTopPapers(topN, fieldId) {
    return await axiosGet(`/topPapers`, { topN, field_id: fieldId });
}

async function getAverageTopPapers(topN, fieldId) {
    return await axiosGet(`/averageTopPapers`, { topN, field_id: fieldId });
}

async function getPaperbyJournal(journal) {
    return await axiosGet(`/journalPaper`, { journal })
}

async function getPaperByVenue(venue) {
    return await axiosGet(`/venuePaper`, { venue })
}

async function getTopJournal(topN, criterion) {
    return await axiosGet(`/topJournal`, { topN,  criterion });
}

async function getTopVenue(topN, criterion) {
    return await axiosGet(`/topVenue`, { topN, criterion });
}

async function getFieldById(fieldId) {
    return await axiosGet(`/field/${fieldId}`);
}

async function getFieldByName(fieldName) {
    return await axiosGet(`/field`, { fieldName });
}

async function getPaperOfField(fieldId) {
    return await axiosGet(`/fieldPapers/${fieldId}`);
}

async function getAuthorOfField(fieldId) {
    return await axiosGet(`/fieldAuthors/${fieldId}`);
}

async function getTopAuthorOfField(topN, fieldId, criterion) {
    return await axiosGet(`/fieldTopAuthors`, { topN, field_id: fieldId, criterion });
}

async function getTopPaperOfField(topN, fieldId, criterion) {
    return await axiosGet(`/fieldTopPapers`, { topN, field_id: fieldId, criterion });
}

async function getTopJornalOfField(topN, fieldId, criterion) {
    return await axiosGet(`/fieldTopJournals`, { topN, field_id: fieldId, criterion });
}

async function getTopVenueOfField(topN, fieldId, criterion) {
    return await axiosGet(`/fieldTopVenues`, { topN, field_id: fieldId, criterion });
}

async function getAverageCitationCountOfField(fieldId) {
    return await axiosGet(`/fieldAverageCitationCount/${fieldId}`);
}

async function getRelatedPaperByPaperId(paperId) {
    return await axiosGet(`/relatedPaper/${paperId}`);
}

export {
    getAuthorById, getAuthorByName, getNameAndAliasByAuthorId, getTopAuthots, getAuthorFields, getAuthorCollaborators,
    getPaperbyId, getPaperFields, getPaperAuthors, getPaperExternalIds, getTopPapers, getAverageTopPapers,
    getPaperbyJournal, getPaperByVenue, getTopJournal, getTopVenue, getFieldById, getFieldByName, getPaperOfField,
    getAuthorOfField, getTopAuthorOfField, getTopPaperOfField, getTopJornalOfField, getTopVenueOfField, 
    getAverageCitationCountOfField, getAuthorPapers, getRelatedPaperByPaperId,
}
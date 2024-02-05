from django.core.paginator import EmptyPage
from rest_framework.exceptions import ValidationError


def Paginate(data, paginator, pageNumber):
    
    if int(pageNumber) > paginator.num_page:
        raise ValidationError('not enough page', code=404)
    try:
        privious_page_number = paginator.page(pageNumber).privious_page_number()
    except EmptyPage:
        privious_page_number=None
    try:
        next_page_number = paginator.page(pageNumber).next_page_number()
    except EmptyPage:
        next_page_number=None
        
    return {
        'pagination':{
            'previous_page': privious_page_number,
            'is_previous_page':paginator.page(pageNumber).has_privious(),
            'is_next_page': next_page_number,
            'start_index' : paginator.page(pageNumber).start_index(),
            'end_index': paginator.page(pageNumber).end_index(),
            'total_entries':paginator.count,
            'total_pages':paginator.num_pages,
            'page' : int(pageNumber)
        },
        'results': data
    }
        
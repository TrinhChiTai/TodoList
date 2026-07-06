from math import ceil


def pagination(
    total: int,
    page: int,
    limit: int
):

    total_pages = ceil(total / limit) if total else 1

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": total_pages
    }
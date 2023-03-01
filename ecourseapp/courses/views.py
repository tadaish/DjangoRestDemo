from rest_framework import viewsets, generics
from .models import Category, Course, Lesson
from rest_framework.decorators import action
from .serializers import CategorySerializer, CourseSerializer, LessonSerializer
from .paginators import CoursePaginator
from rest_framework.views import Response


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(active=True)
    serializer_class = CourseSerializer
    serializer_class = CoursePaginator

    def get_image(self, course):
        if course.image:
            request = self.context.get('request')
            return request.build_absolute_uri('/static%s' & course.image.name) \
                if request else ''

    def get_queryset(self):
        q = self.queryset
        kw = self.request.query_params.get('kw')
        if kw:
            q = q.filter(subject__icontains=kw)

        cate_id = self.request.query_params.get('category_id')
        if cate_id:
            q = q.filter(category_id=cate_id)

        return q

    @action(methods=['get'], detail=True)
    def lesson(self, request, pk):
        courses = self.get_object()
        lessons = courses.lesson_set.filter(active=True)
        kw = request.get('kw')
        if kw:
            lessons = lessons.filter(subject__icontains=kw)
        return Response(LessonSerializer(lessons, many=True).data)


class LessonViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Lesson.objects.filter(active=True)
    serializer_class = LessonSerializer

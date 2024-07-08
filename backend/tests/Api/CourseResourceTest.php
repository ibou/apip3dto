<?php

namespace App\Tests\Api;

use App\Factory\CourseFactory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class CourseResourceTest extends ApiTestCase
{
    use ResetDatabase;
    use Factories;

    public function testGetCollectionOfCourses(): void
    {
        CourseFactory::createMany(5);
        $json = $this->browser()
            ->get('/api/courses')
            ->assertJson()
            ->assertJsonMatches('"hydra:totalItems"', 5)
            ->assertJsonMatches('length("hydra:member")', 5)
            ->json()
        ;

        $this->assertSame(array_keys($json->decoded()['hydra:member'][0]), [
            '@id',
            '@type',
            'name',
            'code',
            'professors',
            'semesters',
            'credits',
            'oldCourses',
            'newCourses',
            'modules',
            'courseComments',
        ]);
    }

    public function testGetOneCourse(): void
    {
        $course = CourseFactory::createOne();

        $this->browser()
            ->get('/api/courses/'.$course->getId())
            ->assertJson()
            ->assertJsonMatches('"@id"', '/api/courses/'.$course->getId());
    }

    public function testGetCourseFilterByName(): void
    {
        $course1 = CourseFactory::createOne([
            'name' => 'Course1',
        ]);

        $course2 = CourseFactory::createOne([
            'name' => 'Course2',
        ]);

        $course3 = CourseFactory::createOne([
            'name' => 'Course3',
        ]);

        CourseFactory::createMany(5);

        $this->browser()
            ->get('/api/courses?name=course2')
            ->assertJson()
            ->assertJsonMatches('"hydra:totalItems"', 1)
            ->assertJsonMatches('length("hydra:member")', 1)
            ->get('/api/courses?name=course')
            ->assertJson()
            ->assertJsonMatches('"hydra:totalItems"', 3)
            ->assertJsonMatches('length("hydra:member")', 3)
        ;
    }

    public function testGetCourseFilterByCode(): void
    {
        $course1 = CourseFactory::createOne([
            'code' => 'code1',
        ]);

        $course2 = CourseFactory::createOne([
            'code' => 'code2',
        ]);

        $course3 = CourseFactory::createOne([
            'code' => 'code3',
        ]);

        CourseFactory::createMany(5);

        $this->browser()
            ->get('/api/courses?code=code2')
            ->assertJson()
            ->assertJsonMatches('"hydra:totalItems"', 1)
            ->assertJsonMatches('length("hydra:member")', 1)
            ->get('/api/courses?code=code')
            ->assertJson()
            ->assertJsonMatches('"hydra:totalItems"', 3)
            ->assertJsonMatches('length("hydra:member")', 3)
        ;
    }
}